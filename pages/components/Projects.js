import { useQuery, gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const QUERY = gql`
  query {
    projectCollection {
      items {
        name
        logo {
          title
          description
          contentType
          size
          url
          width
          height
        }
        owner {
          name
          email
        }
        participantsCollection {
          items {
            name
            email
          }
        }
        description {
          json
        }
        capacity
        popularity
        progress
      }
    }
  }
`;

export default function Projects() {
  const { data, loading, error } = useQuery(QUERY);

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

  const projects = data.projectCollection.items;

  return (
      <Row>

        <Row>

            {projects.map((project) => (
              <>
                  <Card className={styles.card} style={{ width: '18rem' }}>
                    <div style={{width:"100%", height:180, backgroundColor:"red"}}>
                      Logo goes here
                    </div>
                    <Card.Body>
                      <Card.Title>{project.name} </Card.Title>
                      <Card.Text >
                          {project.description?.json.content[0].content[0].value}
                      </Card.Text>
                      <Card.Text>
                        Team members: daniel brazil, Jay Liu
                      </Card.Text>
                      <Button variant="primary">Join</Button>
                    </Card.Body>
                  </Card>

              </>
            ))}

        </Row>
      </Row>
  );
}
