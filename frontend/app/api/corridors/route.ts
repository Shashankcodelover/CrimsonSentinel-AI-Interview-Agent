import { NextResponse } from 'next/server';
import { cognitiveMeshService } from '@/lib/cognitiveMeshService';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      corridors: cognitiveMeshService.getAllCorridors(),
      metrics: cognitiveMeshService.getMetrics()
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const corridor = cognitiveMeshService.provisionCorridor(body);
    return NextResponse.json({ success: true, data: corridor }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const count = cognitiveMeshService.deleteAllCorridors();
  return NextResponse.json({
    success: true,
    message: `Universal purge: severed all ${count} cognitive probe corridors.`,
    count
  });
}
