import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

export default function EditEvent() {
  const data = useRouteLoaderData('event-detail');
  const event = data.event;

  return <EventForm method='PATCH' event={event} />;
}
