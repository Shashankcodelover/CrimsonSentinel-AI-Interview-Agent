import { NextResponse } from 'next/server';
import { cognitiveMeshService, type CandidateProfile } from '@/lib/cognitiveMeshService';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let items: Partial<CandidateProfile>[] = [];

    if (contentType.includes('csv') || contentType.includes('text/plain')) {
      const text = await req.text();
      items = cognitiveMeshService.parseCandidateCSV(text);
    } else {
      const body = await req.json();
      if (Array.isArray(body)) {
        items = body;
      } else if (body.csv) {
        items = cognitiveMeshService.parseCandidateCSV(body.csv);
      } else if (Array.isArray(body.candidates)) {
        items = body.candidates;
      } else {
        items = [body];
      }
    }

    if (items.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid candidate records in payload.' }, { status: 400 });
    }

    const created = cognitiveMeshService.bulkCreateCandidates(items);
    return NextResponse.json({
      success: true,
      message: `Successfully ingested ${created.length} candidate profiles into assessment pipeline.`,
      data: created
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
