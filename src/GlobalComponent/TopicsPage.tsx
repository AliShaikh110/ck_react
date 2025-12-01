// e.g. src/pages/TopicsPage.tsx

import TopicSearchBar from "../components/TopicSearchBar";

export default function TopicsPage({subject, routeName}:{subject:number, routeName:string}) {
  return (
    <div>
      <h1>Search Topics</h1>
      {/* <TopicSearchBar subject={subject} routeName={routeName}/> */}
    </div>
  );
}
