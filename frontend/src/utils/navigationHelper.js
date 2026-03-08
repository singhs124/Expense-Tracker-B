// Helper function to get tab icons
export const getTabIcon = (routeName) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Add Expense':
      return 'add-circle';
    case 'Statistics':
      return 'bar-chart';
    case 'Profile':
      return 'person';
    case 'Settings':
      return 'settings';
    default:
      return 'help-outline';
  }
};

// Helper function to get tab labels
export const getTabLabel = (routeName) => {
  switch (routeName) {
    case 'Home':
      return 'Dashboard';
    case 'Add Expense':
      return 'Add';
    case 'Statistics':
      return 'Stats';
    case 'Profile':
      return 'Profile';
    case 'Settings':
      return 'Settings';
    default:
      return routeName;
  }
};
