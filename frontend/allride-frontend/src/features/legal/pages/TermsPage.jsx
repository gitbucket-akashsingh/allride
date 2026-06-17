import { LegalPageLayout, LegalSection } from "@/shared/components/LegalPageLayout";
import { SUPPORT_EMAIL, SAFETY_EMAIL, LEGAL_LAST_UPDATED } from "@/shared/constants/supportInfo";

function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated={LEGAL_LAST_UPDATED}>
      <LegalSection title="1. Agreement to terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AllRide
          platform, including our website, mobile applications, and related services
          (collectively, the &quot;Service&quot;), operated by AllRide (&quot;AllRide,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;).
        </p>
        <p>
          By creating an account, booking a ride, or driving on the platform, you agree
          to these Terms. If you do not agree, you may not use the Service.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          You must be at least 18 years old and able to form a binding contract to use
          the Service. Drivers must hold a valid driver&apos;s license, meet local regulatory
          requirements, maintain valid insurance where required, and provide accurate
          vehicle and identity information during onboarding.
        </p>
        <p>
          You agree to provide truthful, current, and complete registration information
          and to keep your account details up to date.
        </p>
      </LegalSection>

      <LegalSection title="3. Your account">
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials and for all activity under your account. Notify us immediately
          if you suspect unauthorized access.
        </p>
        <p>
          Each account is for one individual. You may not share, sell, or transfer your
          account without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection title="4. The AllRide platform">
        <p>
          AllRide provides a technology platform that connects riders who need
          transportation with drivers who wish to provide it. AllRide is not a
          transportation carrier, employer of drivers, or agent for users. Drivers are
          independent users of the platform, not employees or partners of AllRide.
        </p>
        <p>
          We do not guarantee the availability of drivers, rides, or specific response
          times. Service availability may vary by location, demand, and other factors.
        </p>
      </LegalSection>

      <LegalSection title="5. Rider terms">
        <p>
          As a rider, you agree to provide accurate pickup and drop-off locations, be
          ready at the pickup point at the scheduled time, and treat drivers with respect.
        </p>
        <p>
          You are responsible for all charges associated with your rides, including fares,
          tolls, waiting fees, cancellation fees (where applicable), and tips you choose
          to provide. Payment is processed through the Service as described at the time
          of booking or completion.
        </p>
        <p>
          You must comply with all applicable laws and refrain from requesting illegal
          activities, carrying prohibited items, or engaging in harassment or unsafe
          behavior during rides.
        </p>
      </LegalSection>

      <LegalSection title="6. Driver terms">
        <p>
          As a driver, you agree to maintain a valid license, registration, and insurance
          as required by law; keep your vehicle in safe operating condition; and comply
          with all traffic, transportation, and local regulations.
        </p>
        <p>
          You may accept or decline ride requests at your discretion when using the
          platform. You are responsible for your own taxes, expenses, and compliance with
          laws applicable to your driving activity.
        </p>
        <p>
          AllRide may charge platform fees or commissions as disclosed in the driver
          dashboard or related materials. Earnings and fee structures may change with
          reasonable notice where required by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Payments, fares, and refunds">
        <p>
          Fares are calculated based on factors displayed in the app at or before booking,
          such as distance, time, demand, and applicable fees. Final charges may include
          adjustments for route changes, tolls, or waiting time.
        </p>
        <p>
          Refunds are issued at our discretion or as required by law. If you believe a
          charge is incorrect, contact support with ride details within a reasonable
          time. Chargebacks without contacting us first may result in account suspension.
        </p>
      </LegalSection>

      <LegalSection title="8. Cancellations">
        <p>
          Riders and drivers may cancel rides according to the cancellation rules shown
          in the app. Cancellations after a driver has accepted may incur fees to compensate
          the other party for time and effort, as disclosed at the time of cancellation.
        </p>
        <p>
          Repeated no-shows, fraudulent cancellations, or abuse of cancellation policies
          may result in warnings, fees, or account termination.
        </p>
      </LegalSection>

      <LegalSection title="9. Prohibited conduct">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use the Service for any unlawful purpose</li>
          <li>Harass, threaten, or endanger other users</li>
          <li>Provide false identity, vehicle, or payment information</li>
          <li>Interfere with or disrupt the Service or its security</li>
          <li>Reverse engineer, scrape, or copy the platform without permission</li>
          <li>Use the Service to compete with AllRide or solicit users off-platform improperly</li>
          <li>Discriminate against users based on protected characteristics</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Safety">
        <p>
          Your safety is important. Use in-app features to contact your driver or rider
          during a trip. For emergencies involving immediate danger, contact local
          emergency services (e.g., 911) first.
        </p>
        <p>
          Report safety concerns to{" "}
          <a href={`mailto:${SAFETY_EMAIL}`} className="text-yellow-600 dark:text-yellow-400 font-semibold">
            {SAFETY_EMAIL}
          </a>
          . We may investigate reports and take action including warnings, suspension,
          or permanent removal from the platform.
        </p>
      </LegalSection>

      <LegalSection title="11. Intellectual property">
        <p>
          The Service, including the AllRide name, logo, software, design, and content,
          is owned by AllRide or its licensors and protected by intellectual property laws.
          You receive a limited, non-exclusive, non-transferable license to use the Service
          for its intended purpose. You may not copy, modify, or distribute our materials
          without permission.
        </p>
      </LegalSection>

      <LegalSection title="12. Disclaimer of warranties">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
          KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ALLRIDE
          DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALLRIDE AND ITS OFFICERS, DIRECTORS,
          EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL,
          ARISING FROM YOUR USE OF THE SERVICE.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR
          THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO ALLRIDE
          IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS (USD $100).
        </p>
        <p>
          Some jurisdictions do not allow certain limitations, so some of the above may not
          apply to you.
        </p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You agree to indemnify and hold harmless AllRide from any claims, damages,
          losses, or expenses (including reasonable legal fees) arising from your use
          of the Service, your violation of these Terms, or your violation of any rights
          of another person or entity.
        </p>
      </LegalSection>

      <LegalSection title="15. Termination">
        <p>
          You may stop using the Service and request account deletion at any time through
          the app or by contacting support.
        </p>
        <p>
          We may suspend or terminate your access immediately if you violate these Terms,
          pose a safety risk, engage in fraud, or if we are required to do so by law.
          Upon termination, your right to use the Service ends, but provisions that by
          their nature should survive will remain in effect.
        </p>
      </LegalSection>

      <LegalSection title="16. Governing law">
        <p>
          These Terms are governed by the laws of the jurisdiction in which AllRide is
          incorporated, without regard to conflict-of-law principles. Disputes shall be
          resolved in the courts of that jurisdiction, unless applicable law requires
          otherwise.
        </p>
      </LegalSection>

      <LegalSection title="17. Changes to these terms">
        <p>
          We may modify these Terms from time to time. We will post updated Terms on this
          page and update the &quot;Last updated&quot; date. Material changes may be communicated via
          email or in-app notice. Continued use after changes take effect constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="18. Contact us">
        <p>For questions about these Terms, contact:</p>
        <p>
          Email:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-yellow-600 dark:text-yellow-400 font-semibold">
            {SUPPORT_EMAIL}
          </a>
        </p>
        <p>
          See also our{" "}
          <a href="/privacy" className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export default TermsPage;