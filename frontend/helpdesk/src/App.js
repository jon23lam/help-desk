import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import RootProvider from "./providers/RootProvider";
import AppProvider from "./providers/AppProvider";
import { HeaderRoute } from "./routes/HeaderRoute";
import { SupportPage } from "./pages/public/SupportPage";
import { TicketManagementPage } from "./pages/admin/TicketManagementPage";
import { Login } from "./pages/public/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticationProvider>
          <AppProvider>
            <RootProvider>
              <Routes>
                <Route path="" element={<HeaderRoute />}>
                  {/* Public route */}
                  <Route path="/" element={<SupportPage />} />
                  <Route path="/login" element={<Login />} />

                  {/* Put all routes that need authentication in here */}
                  <Route path="/" element={<AuthenticatedRoute />}>
                    <Route
                      path="/admin-panel"
                      element={<TicketManagementPage />}
                    />
                  </Route>
                </Route>
              </Routes>
            </RootProvider>
          </AppProvider>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
