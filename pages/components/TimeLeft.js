import { useQuery, gql } from "@apollo/client";
import {Col, Row} from "react-bootstrap";
import * as React from 'react'
import styles from "../../styles/Timeleft.module.css";



const QUERY = gql`
  query {
      eventCollection{
        items{
          eventTime
        }
      }
  }
`;

export default function TimeLeft() {
    const { data, loading, error } = useQuery(QUERY);
    const [timeLeft, setTimeLeft] = React.useState();

    const getTimeLeftTillNextSnagDay = (snagDayEventTime) => {
        let differencesBetweenSnagDayEventAndNow  = +new Date(snagDayEventTime) - +new Date();

        const daysLeft  = Math.floor(differencesBetweenSnagDayEventAndNow  / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((differencesBetweenSnagDayEventAndNow  / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((differencesBetweenSnagDayEventAndNow  / 1000 / 60) % 60);
        const secondsLeft = Math.floor((differencesBetweenSnagDayEventAndNow  / 1000) % 60);

        return `${daysLeft} days ${hoursLeft} hours ${minutesLeft} min`;

    }
    React.useEffect(()=>{
        if(data){
            const snagDayEventTime = data.eventCollection.items[0].eventTime;

            const timeLeftTillNextSnagDay = getTimeLeftTillNextSnagDay(snagDayEventTime);

            setTimeLeft(timeLeftTillNextSnagDay)
        }
    },[data])

    if (loading) {
        return (
            <h2>
                <a href="#loading" aria-hidden="true" id="loading"></a>Loading...
            </h2>
        );
    }

    if (error) {
        console.error(error);
        return null;
    }



    console.log(data)
  return (
      <Row>
          <Col xs={12} className={styles.heading}>
              Next snag day in {timeLeft}
          </Col>
      </Row>
  );
}
