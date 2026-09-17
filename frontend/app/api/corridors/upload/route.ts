import { NextResponse } from 'next/server';
import { cognitiveMeshService, type CognitiveProbeCorridor } from '@/lib/cognitiveMeshService';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let items: Partial<CognitiveProbeCorridor>[] = [];

    if (contentType.includes('csv') || contentType.includes('text/plain')) {
      const text = await req.text();
      items = cognitiveMeshService.parseCorridorCSV(text);
    } else {
      const body = await req.json();
      if (Array.isArray(body)) {
        items = body;
      } else if (body.csv) {
        items = cognitiveMeshService.parseCorridorCSV(body.csv);
      } else if (Array.isArray(body.corridors)) {
        items = body.corridors;
      } else {
        items = [body];
      }
    }

    if (items.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid corridor records in payload.' }, { status: 400 });
    }

    const created = cognitiveMeshService.bulkCreateCorridors(items);
    return NextResponse.json({
      success: true,
      message: `Successfully provisioned ${created.length} Socratic probe corridors.`,
      data: created
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
