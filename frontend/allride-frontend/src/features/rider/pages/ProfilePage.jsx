function ProfilePage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 88px)",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "48px" }}>👤</span>
      <h2 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>
        My Profile
      </h2>
      <p style={{ color: "#6b7280" }}>Manage your account details here</p>
    </div>
  );
}
export default ProfilePage;
