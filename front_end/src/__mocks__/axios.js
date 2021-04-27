const mockNoop = () => new Promise(() => {});

const axios = {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    
    default: mockNoop,
    post: mockNoop,
    put: mockNoop,
    delete: mockNoop,
    patch: mockNoop
  };
  
export default axios;