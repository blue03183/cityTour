export const DEFAULT = {
  routes: (config) => {
    return {
      post: [
        { path: '/createCityTour', action: 'createCityTour' },
        { path: '/searchTour', action: 'searchTour' },
      ],
    };
  },
};
