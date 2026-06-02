import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type WithMeta = { data: unknown; meta: Record<string, unknown> };

function hasDataAndMeta(value: unknown): value is WithMeta {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'meta' in value
  );
}

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now();
    return (next.handle() as Observable<unknown>).pipe(
      map((response) => {
        const duration_ms = Date.now() - start;
        const total = hasDataAndMeta(response) && Array.isArray(response.data)
          ? response.data.length
          : undefined;
        if (hasDataAndMeta(response)) {
          return { ...response, meta: { ...response.meta, duration_ms, total } };
        }
        return { data: response, meta: { duration_ms, total } };
      }),
    );
  }
}
