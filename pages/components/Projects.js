import { useQuery, gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";

const QUERY = gql`
    query {
        projectCollection {
            items {
                name
                description {
                    json
                }
                capacity
            }
        }
    }
`;

export default function Projects() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" id="loading"></a>Loading...</h2>;
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
          <h3><a href="#project-name" aria-hidden="true" id="project-name"></a>{project.name}</h3>
          <p>
            {project.description.json.content[0].content[0].value} - {project.capacity}
          </p>
        </div>
      ))}
    </div>
  );
}