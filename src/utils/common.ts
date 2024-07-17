import type { Context } from "hono"

export default function unauthorizedResponse(opts: {
    ctx: Context
    error: string
    errDescription: string
    statusText?: string
  }) {
    return new Response('Unauthorized', {
      status: 401,
      statusText: opts.statusText,
      headers: {
        'WWW-Authenticate': `Bearer realm="${opts.ctx.req.url}",error="${opts.error}",error_description="${opts.errDescription}"`,
      },
    })
}