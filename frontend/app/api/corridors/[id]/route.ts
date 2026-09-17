import { NextResponse } from 'next/server';
import { cognitiveMeshService } from '@/lib/cognitiveMeshService';

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ok = cognitiveMeshService.severCorridor(id);
  if (!ok) {
    return NextResponse.json({ success: false, error: 'Corridor not found' }, { status: 404 });
  }
  return NextResponse.json({
    success: true,
    message: `Cognitive probe corridor ${id} severed successfully.`
  });
}
