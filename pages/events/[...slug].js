import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Head from 'next/head';

function FilteredEventsPage(props) {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState()

  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json())

  const {data, error} = useSWR('https://nextjs-my-firstapp-v12-default-rtdb.firebaseio.com/events.json', fetcher)

  useEffect(() => {
    if(data) {
      let events = [];

      for(const key in data) {
          events.push({
              id: key,
              ...data[key]
          })
      }
      setLoadedEvents(events)
    }
   }, [data])

    

   let pageHeadTag = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A event filtered page.`} />
    </Head>
   )
   
  
  if (!loadedEvents) {
    return  (
      <>
      {pageHeadTag}
      <p className='center'>Loading...</p>
    </> );
  }

  const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadTag =  ( <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events from ${numMonth}/${numYear}`} />
    </Head> )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || error
  ) {
    return (
      <Fragment>
        {pageHeadTag}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );  
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadTag}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadTag}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

// export async function getServerSideProps(context) {

//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true
//       }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });


//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }

// }
