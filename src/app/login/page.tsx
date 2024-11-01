import LoginForm from "@/app/login/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <LoginForm />
    </div>
  );
}
