import { getFeaturedEvents } from '../helpers/api-utils'
import EventList from '../components/events/event-list';

function HomePage(props) {

  

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {

  const response = await fetch('https://nextjs-my-firstapp-v12-default-rtdb.firebaseio.com/sales.json')
  console.log(response)

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    }
  }
}
