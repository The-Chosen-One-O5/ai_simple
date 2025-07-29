import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, messages } = body;

    if (!model || !messages) {
      return NextResponse.json({ error: 'Model and messages are required' }, { status: 400 });
    }

    // Use non-streaming for better reliability
    const response = await fetch('https://wow.typegpt.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false, // Disable streaming to avoid port closure issues
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: 'Failed to get response from AI service' }, { status: response.status });
    }

    const data = await response.json();
    
    // Extract the assistant's message from the response
    const assistantMessage = {
      role: 'assistant',
      content: data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
    };

    return NextResponse.json(assistantMessage);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}