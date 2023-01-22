type TabSchema = {
  id: string;
  index: number;
  name: string;
  content: string;
};

export type LowDbSchema = {
  tabs: TabSchema[];
  selectedTab: string;
  isTabAreaOpen: boolean;
  isDarkTheme: boolean;
  windowSettings: {
    isAlwaysOnTop: boolean;
    width: number;
    height: number;
  };
};
