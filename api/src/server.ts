import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';

const PORT = Number(process.env.PORT || '9090');

const app = fastify({ logger: true });
app.register(fastifySocketIO);

app.ready((err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // @ts-ignore
  app.io.on('connection', () => {
    /* … */
  });
});

app.listen({ port: PORT });
