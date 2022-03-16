import Head from 'next/head'
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
    return (<Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name='description' content='description of the page' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>)
}


export async function getStaticProps() {
    //fetch data from API
    const client = await MongoClient.connect('mongodb+srv://dbUser:qwert123@cluster0.hu2r8.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray();

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     //fetch data
//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }
// }

export default HomePage