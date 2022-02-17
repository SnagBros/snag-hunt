import { useQuery, gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";

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
    <div className={styles.grid}>
      {projects.map((project) => (
        <div key={project.name} className={styles.card}>
          {/* <img src="/orbit.svg" /> */}
          <div className={styles.projectLogo}>
            <img src={project.logo.url}/>
          </div>

          <h3>
            <a href="#project-name" aria-hidden="true" id="project-name"></a>
            {project.name}  /  Progress {project.progress}
          </h3>
          <p>{project.description.json.content[0].content[0].value}</p>
          <p>{project.participantsCollection.items.length} / {project.capacity}</p>
          <div className={[styles.fire, styles.small].join(" ")}>
            <img
              className={styles.fireCentre}
              src="https://media.giphy.com/media/VIE8BijRkECoGB9vuM/giphy.gif"
            ></img>
            <img
              className={styles.fireLeft}
              src="https://media.giphy.com/media/VIE8BijRkECoGB9vuM/giphy.gif"
            ></img>
            <img
              className={styles.fireRight}
              src="https://media.giphy.com/media/VIE8BijRkECoGB9vuM/giphy.gif"
            ></img>
            <p>{project.popularity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
