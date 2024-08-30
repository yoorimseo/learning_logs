import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventList from '../components/EventsList';
import { Suspense } from 'react';

function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

export default Events;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
