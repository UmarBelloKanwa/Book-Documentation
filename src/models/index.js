import React, { createContext, Component } from "react";
import { withTranslation } from "react-i18next";
import "./i18n";
import chaptersLinks from "./urls";

const ModelContext = createContext(null);

class ModelProvider extends Component {
  constructor(props) {
    super(props);
    const defaultSettings = {
      lang: "ar",
      direction: "RTL",
      theme: "light",
      "search histories": [],
      "clip notes": [],
      "paused histories": []
    };
    this.state = {
      chaptersLinks: [],
      titleToURLMap: new Map(),
      urlToTitleMap: new Map(),
      error: null,
      settings: JSON.parse(localStorage.getItem("settings")) || defaultSettings
    };
    this.props.i18n.changeLanguage(this.state.settings.lang);
  }

  saveSetting = (key, value) => {
    const updatedSettings = {
      ...this.state.settings,
      [key]: value
    };
    if (key === 'lang') this.props.i18n.changeLanguage(value);
    this.setState({ settings: updatedSettings }, () => {
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
    });
  }

  componentDidMount() {
    const titleToURLMap = new Map();
    const urlToTitleMap = new Map();

    chaptersLinks.forEach((link) => {
      titleToURLMap.set(link.enTitle, link.url);
      titleToURLMap.set(link.arTitle, link.url);
      urlToTitleMap.set(link.url, link.enTitle);
    });

    this.setState({
      chaptersLinks: Array.from(urlToTitleMap.keys()),
      titleToURLMap,
      urlToTitleMap,
    });
  }

  titleToURL = (title) => {
    return this.state.titleToURLMap.get(title) || null;
  };

  urlToTitle = (url) => {
    return this.state.urlToTitleMap.get(url) || null;
  };

  getChapterByTitle = (title) => {
    const url = this.titleToURL(title);
    if (url) {
      const urlToTitleArray = Array.from(this.state.urlToTitleMap.values());
      const index = urlToTitleArray.indexOf(this.urlToTitle(url));
      const key = `book.chapters.${index}`;
      return index !== -1 ? this.props.t(key, { returnObjects: true }) : null;
    }
    return null;
  };

  render() {
    const contextValue = {
      chaptersUrls: this.state.chaptersLinks,
      titleToURL: this.titleToURL,
      urlToTitle: this.urlToTitle,
      getChapterByTitle: this.getChapterByTitle,
      settings: this.state.settings, 
      saveSetting: this.saveSetting, 
      error: this.state.error,
      t: this.props.t,
    };

    return (
      <ModelContext.Provider value={contextValue}>
        {this.props.children}
      </ModelContext.Provider>
    );
  }
}

export function useModel() {
  const context = React.useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}

export default withTranslation(["translation", "book"])(ModelProvider);
