import { LegalPageLayout, LegalSection } from "@/shared/components/LegalPageLayout";
import { PRIVACY_EMAIL, LEGAL_LAST_UPDATED } from "@/shared/constants/supportInfo";

function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LEGAL_LAST_UPDATED}>
      <LegalSection title="1. Introduction">
        <p>
          AllRide (&quot;AllRide,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the AllRide
          platform, including our website, mobile applications, and related services
          (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect,
          use, disclose, and protect your personal information when you use the Service
          as a rider, driver, or visitor.
        </p>
        <p>
          By creating an account or using the Service, you agree to the collection and
          use of information in accordance with this policy. If you do not agree,
          please do not use the Service.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p><strong>Account information.</strong> When you register, we collect your name,
          email address, phone number, and password (stored in hashed form). Drivers may
          also provide license, vehicle, and insurance details during onboarding.</p>
        <p><strong>Ride information.</strong> We collect pickup and drop-off locations,
          route data, fare amounts, ride timestamps, ride status, ratings, and feedback
          related to trips you request or complete.</p>
        <p><strong>Location information.</strong> With your permission, we collect precise
          GPS location from your device when the app is in use—especially during active
          rides. Riders&apos; locations help drivers navigate; drivers&apos; locations enable
          live tracking and trip safety features.</p>
        <p><strong>Payment information.</strong> Payment card details are processed by
          our third-party payment providers. We do not store full card numbers on our
          servers. We may retain transaction IDs, payment status, and billing-related
          metadata.</p>
        <p><strong>Device and usage information.</strong> We may collect IP address,
          browser type, device model, operating system, app version, crash logs, and
          general usage analytics to maintain and improve the Service.</p>
        <p><strong>Communications.</strong> If you contact support, we collect the
          content of your messages, attachments, and related metadata to resolve your
          request.</p>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>We use personal information to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide, operate, and maintain the Service</li>
          <li>Match riders with drivers and facilitate trips</li>
          <li>Process payments and send receipts</li>
          <li>Enable live ride tracking and safety features</li>
          <li>Verify driver eligibility and prevent fraud</li>
          <li>Respond to support requests and communicate with you</li>
          <li>Send service-related notifications (ride updates, account alerts)</li>
          <li>Analyze usage to improve performance and user experience</li>
          <li>Comply with legal obligations and enforce our Terms of Service</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How we share your information">
        <p><strong>Between riders and drivers.</strong> During an active or upcoming ride,
          riders and drivers may see each other&apos;s name, profile photo (if provided),
          vehicle details, and real-time location as needed to complete the trip.</p>
        <p><strong>Service providers.</strong> We share data with vendors who help us
          operate the Service—such as cloud hosting, payment processing, mapping, analytics,
          and customer support—under contracts that require them to protect your data.</p>
        <p><strong>Legal and safety.</strong> We may disclose information if required by
          law, regulation, legal process, or governmental request, or when we believe
          disclosure is necessary to protect the rights, property, or safety of AllRide,
          our users, or others.</p>
        <p><strong>Business transfers.</strong> If AllRide is involved in a merger,
          acquisition, or sale of assets, your information may be transferred as part
          of that transaction, subject to this Privacy Policy.</p>
        <p>
          <strong>We do not sell your personal information.</strong>
        </p>
      </LegalSection>

      <LegalSection title="5. Location data">
        <p>
          Location data is essential for ride-hailing. We collect location when you use
          features that require it—for example, setting a pickup point, navigating to a
          destination, or tracking an active ride.
        </p>
        <p>
          You can limit location access through your device settings, but some features
          may not work without it. We retain location data associated with completed rides
          for safety, dispute resolution, and legal compliance, then delete or anonymize
          it according to our retention practices.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies and similar technologies">
        <p>
          Our website may use cookies and similar technologies for session management,
          security, and analytics. You can control cookies through your browser settings.
          Disabling cookies may affect certain website functionality.
        </p>
      </LegalSection>

      <LegalSection title="7. Data retention">
        <p>
          We retain personal information for as long as your account is active or as
          needed to provide the Service. Ride records and related data may be kept for a
          longer period to meet legal, tax, audit, and safety requirements.
        </p>
        <p>
          When data is no longer needed, we delete or anonymize it in accordance with
          our internal policies and applicable law.
        </p>
      </LegalSection>

      <LegalSection title="8. Your rights and choices">
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your account and associated data</li>
          <li>Opt out of marketing communications</li>
          <li>Object to or restrict certain processing activities</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="text-yellow-600 dark:text-yellow-400 font-semibold">
            {PRIVACY_EMAIL}
          </a>
          . We may need to verify your identity before processing your request.
        </p>
      </LegalSection>

      <LegalSection title="9. Children&apos;s privacy">
        <p>
          The Service is not intended for children under 13 years of age (or the minimum
          age required in your jurisdiction). We do not knowingly collect personal
          information from children. If you believe a child has provided us with personal
          information, please contact us and we will take steps to delete it.
        </p>
      </LegalSection>

      <LegalSection title="10. Security">
        <p>
          We use industry-standard measures—including encryption in transit, access
          controls, and secure infrastructure—to protect your information. However, no
          method of transmission or storage is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection title="11. International data transfers">
        <p>
          Your information may be processed in countries other than your own. When we
          transfer data internationally, we take steps designed to ensure your information
          receives an adequate level of protection consistent with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the revised
          policy on this page and update the &quot;Last updated&quot; date. For material changes,
          we may notify you by email or through the app. Continued use of the Service
          after changes become effective constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact us">
        <p>
          If you have questions about this Privacy Policy or our data practices, contact:
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="text-yellow-600 dark:text-yellow-400 font-semibold">
            {PRIVACY_EMAIL}
          </a>
        </p>
        <p>
          For general support, visit our{" "}
          <a href="/support" state={location.state} className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline">
            Support Center
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export default PrivacyPage;