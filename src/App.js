import React, { useEffect} from "react";
import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Chapters from "./views/Chapters";
import ChaptersList from "./components/ChaptersList"; 
import NoPage from "./views/NoPage";
import { useModel } from "./models";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import Media from './views/MediaComponent';
import i18n from "./models/i18n";

function App() {
  const model = useModel();
  const { settings } = model;
  const isDarkMode = settings.theme === 'light';

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
    const { lang, direction } = settings;
    //document.documentElement.dir = direction.toLowerCase();
    document.documentElement.dir = i18n.dir(i18n.language);
    document.documentElement.lang = lang;
  }, [settings, isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapters/:chapterName" element={<Chapters />} />
            <Route path="/chapters-list" element={<ChaptersList className="chapListPage"/>} />
            <Route path="/multimedia" element= {<Media />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
