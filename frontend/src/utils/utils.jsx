export const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");

    if (user && user !== "undefined" && user !== "") {
      const parsedUser = JSON.parse(user);
      return parsedUser ? parsedUser : null; // Return null if JSON parsing fails
    }
    return null; // Return null if user is not found
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
    return null; // Return null in case of any error
  }
};
