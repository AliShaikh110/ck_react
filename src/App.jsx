import { Routes, Route, Link } from "react-router-dom";
// import Home from './pages/Home'
// import EditPage from './pages/EditPage'
import GetAllList from "./getAll/GetAllPage";
import QuestionPreview from "./ui/Form";
import QuestionPreview2 from "./ui/Form2";
import ResponsiveAppBar from "./ui/Header";
import DrawerAppBar from "./ui/Header1";
import Index from "./addQeustion/Index";
import { InitialDataContextProvider } from "./addQeustion/_components/InitalContext";
import TestTopicPage from "./testTopic/Index";
import TestSubjectPage from "./testSubject/Index";
import TestExamCategoriesForm from "./TestExamCategories/components/TestExamCategoriesForm";

function App() {
  return (
    <div>
      <DrawerAppBar />

      <Routes>
        <Route
          path="/"
          element={
            <InitialDataContextProvider>
              <Index />
            </InitialDataContextProvider>
          }
        />
        <Route path="/q" element={<QuestionPreview />} />
        <Route path="/test-subject" element={<TestSubjectPage />} />
        <Route path="/test-exams-category" element={<TestExamCategoriesForm />} />
        <Route
          path="/test-topic"
          element={
            <InitialDataContextProvider>
              <TestTopicPage />
            </InitialDataContextProvider>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <InitialDataContextProvider>
              <QuestionPreview2 />
            </InitialDataContextProvider>
          }
        />
        <Route path="/listing" element={<GetAllList />} />
      </Routes>
    </div>
  );
}

export default App;
