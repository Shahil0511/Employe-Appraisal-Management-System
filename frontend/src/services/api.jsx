// services/api.js
export const assignRoles = async (
  participantId,
  supervisor,
  peers,
  juniors
) => {
  try {
    const response = await fetch("/api/map", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participantId,
        supervisor,
        peers,
        juniors,
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Error assigning roles:", error);
    return { status: 500, message: "Error assigning roles." };
  }
};
