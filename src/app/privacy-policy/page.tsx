import LogoIcon from "@/components/LogoIcon";
import Link from "next/link";

export default function PagePrivacyPolicy() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 lg:pb-20 gap-2 lg:gap-16 xl:p-20 font-[family-name:var(--font-geist-sans)] max-w-[1140px] mx-auto">
      <header className="header w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#313131] text-[35px] leading-[150%] tracking-[-0.353px] font-bold"
        >
          <LogoIcon />
          <span>Your Logo</span>
        </Link>
      </header>
      <main className="lg:grid grid-cols-1 gap-8 lg:gap-16 w-full h-full items-center flex flex-col justify-center">
        <div className="lg:max-w-[512px] w-full mx-auto flex flex-col gap-2 wysiwyg">
          <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold mb-4">
            Privacy Policy
          </h1>
          <p>
            <strong>Effective Date:</strong> June 3, 2025
          </p>

          <p>
            This Privacy Policy describes how your information is collected,
            used, and shared when you use our mini project for testing Facebook
            Login (the "App").
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect limited information through Facebook Login,
            including:
          </p>
          <ul>
            <li>
              Your public Facebook profile (name, email address, profile
              picture)
            </li>
            <li>Facebook User ID</li>
          </ul>
          <p>
            This data is used <strong>only for testing purposes</strong> during
            the development of the application.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>The information collected is used solely to:</p>
          <ul>
            <li>Authenticate users using Facebook Login</li>
            <li>
              Display your basic profile information within the test application
            </li>
          </ul>
          <p>We do not store, share, or sell any personal information.</p>

          <h2>3. Data Retention</h2>
          <p>
            We do not permanently store any user data. All data accessed via
            Facebook is temporary and only used during the active session.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            This app uses <strong>Firebase Authentication</strong> and{" "}
            <strong>Facebook Login API</strong>. Please review their privacy
            policies:
          </p>
          <ul>
            <li>
              <a href="https://www.facebook.com/policy.php" target="_blank">
                Facebook Data Policy
              </a>
            </li>
            <li>
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
              >
                Firebase Privacy and Security
              </a>
            </li>
          </ul>

          <h2>5. Security</h2>
          <p>
            This app is for{" "}
            <strong>testing and development purposes only</strong> and does not
            include advanced security measures. Do not use this application for
            sensitive or production use.
          </p>

          <h2>6. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact:
          </p>
          <p>
            <strong>M.Kannika</strong> <br />
            <Link
              href="mailto:mkannika.consci@gmail.com"
              className="text-[#FF8682]"
            >
              Developer
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
