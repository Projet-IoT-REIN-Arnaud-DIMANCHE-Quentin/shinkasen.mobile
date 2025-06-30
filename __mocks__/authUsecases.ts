export const mockUser = { id: '1', email: 'test@example.com' };

export const register = jest.fn().mockResolvedValue(mockUser);
export const login = jest.fn().mockResolvedValue(mockUser);
export const logout = jest.fn().mockResolvedValue(undefined);
export const getCurrentUser = jest.fn().mockResolvedValue(mockUser);
