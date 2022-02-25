import { useQuery, gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ProjectPopularity from "./ProjectPopularity";

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


          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

            {projects.map((project) => (
              <>
                <div  key={project.name}  className="col mb-4">
                  <Card style={{height: 700, width: 250}}>
                    <Card.Img style={{height:180}} variant="top" src={project.logo ? project.logo.url : '/orbit.svg'}/>
                    <Card.Body>
                      <Card.Title>{project.name}</Card.Title>
                      <Card.Text as="div" style={{height: 200}}>
                        {documentToReactComponents(project.description?.json)}
                      </Card.Text>
                    </Card.Body>

                    <Row>
                      <Col><Card.Text style={{width:70, display:"inline-block", paddingLeft:10}}>
                        {project.participantsCollection.items.length} / {project.capacity}
                      </Card.Text></Col>
                      <Col>
                      <ProjectPopularity popularity={project.popularity}></ProjectPopularity>
                      </Col>
                    </Row>
    
                    <Card.Footer>
                      <Button style={{width:"100%", margin:"10px"}} variant="primary">Join</Button>
                    </Card.Footer>
                  </Card>
                </div>
              </>
            ))}

          </div>

  );
}
