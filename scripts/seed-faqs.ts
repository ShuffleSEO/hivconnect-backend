/**
 * Seed script to populate FAQs collection with sample content
 * Run with: pnpm tsx scripts/seed-faqs.ts
 */

const API_URL = process.env.API_URL || 'https://hivconnect-backend.shuffle-seo.workers.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kevin@shuffleseo.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'er9fmtfKMC$';

interface FAQ {
  question: string;
  answer: {
    root: {
      type: string;
      children: Array<{
        type: string;
        version: number;
        [key: string]: any;
      }>;
      direction: string;
      format: string;
      indent: number;
      version: number;
    };
  };
  category: string;
  order: number;
  language: string;
  status: string;
}

const sampleFAQs: Omit<FAQ, 'answer'>[] = [
  // General category
  {
    question: 'What is HIV Connect Central NJ?',
    category: 'general',
    order: 1,
    language: 'english',
    status: 'published',
  },
  {
    question: 'Who is eligible for services?',
    category: 'general',
    order: 2,
    language: 'english',
    status: 'published',
  },
  {
    question: 'How do I access services?',
    category: 'general',
    order: 3,
    language: 'english',
    status: 'published',
  },

  // Testing category
  {
    question: 'Where can I get tested for HIV?',
    category: 'testing',
    order: 1,
    language: 'english',
    status: 'published',
  },
  {
    question: 'Is HIV testing confidential?',
    category: 'testing',
    order: 2,
    language: 'english',
    status: 'published',
  },
  {
    question: 'How much does HIV testing cost?',
    category: 'testing',
    order: 3,
    language: 'english',
    status: 'published',
  },

  // Treatment category
  {
    question: 'What is antiretroviral therapy (ART)?',
    category: 'treatment',
    order: 1,
    language: 'english',
    status: 'published',
  },
  {
    question: 'Can I afford HIV treatment?',
    category: 'treatment',
    order: 2,
    language: 'english',
    status: 'published',
  },

  // Services category
  {
    question: 'What services are available to people living with HIV?',
    category: 'services',
    order: 1,
    language: 'english',
    status: 'published',
  },
  {
    question: 'Do I need insurance to receive services?',
    category: 'services',
    order: 2,
    language: 'english',
    status: 'published',
  },

  // Planning Council category
  {
    question: 'What is the HIV Health Services Planning Council?',
    category: 'planning-council',
    order: 1,
    language: 'english',
    status: 'published',
  },
  {
    question: 'How can I join the Planning Council?',
    category: 'planning-council',
    order: 2,
    language: 'english',
    status: 'published',
  },
];

const answers: Record<string, string> = {
  'What is HIV Connect Central NJ?':
    'HIV Connect Central NJ is the Middlesex-Somerset-Hunterdon HIV Health Services Planning Council\'s resource directory and information hub. We connect people living with HIV/AIDS to medical care, support services, and community resources across central New Jersey.',

  'Who is eligible for services?':
    'Services are available to anyone living with HIV/AIDS in Middlesex, Somerset, or Hunterdon counties. Many services are also available to those affected by HIV, including family members and caregivers. Some programs have specific eligibility requirements based on income, insurance status, or other factors. Contact individual providers to learn about their specific eligibility criteria.',

  'How do I access services?':
    'You can access services by contacting providers directly through our directory. Many providers offer walk-in services, while others require appointments. If you\'re unsure where to start, call our hotline at (732) 937-5288 for guidance.',

  'Where can I get tested for HIV?':
    'HIV testing is available at multiple locations throughout our service area, including health departments, community health centers, and medical clinics. Many sites offer free, confidential testing with no appointment necessary. Visit our Find Services page to locate testing sites near you.',

  'Is HIV testing confidential?':
    'Yes, HIV testing is confidential. Testing sites follow strict privacy protocols to protect your information. You can choose between confidential testing (results linked to your name but kept private) or anonymous testing (no name attached to test). All testing sites in New Jersey are required to maintain confidentiality.',

  'How much does HIV testing cost?':
    'Many testing sites offer free HIV testing. Sites that charge typically accept insurance, and financial assistance may be available for those without insurance. No one should be denied HIV testing due to inability to pay.',

  'What is antiretroviral therapy (ART)?':
    'Antiretroviral therapy (ART) is a combination of HIV medicines taken daily to treat HIV infection. ART helps people with HIV live longer, healthier lives and reduces the risk of HIV transmission. When taken as prescribed, ART can reduce the amount of HIV in the blood (viral load) to undetectable levels.',

  'Can I afford HIV treatment?':
    'Yes. Several programs can help you afford HIV treatment, including the Ryan White HIV/AIDS Program, AIDS Drug Assistance Program (ADAP), Medicaid, and Medicare. Many providers offer sliding fee scales based on income. Our case managers can help you access these programs and navigate insurance options.',

  'What services are available to people living with HIV?':
    'Services include medical care, case management, mental health counseling, substance abuse treatment, nutrition services, transportation assistance, housing support, legal services, and emergency financial assistance. The range of services varies by provider. Visit our Find Services page to explore all available services.',

  'Do I need insurance to receive services?':
    'No. Many services are available regardless of insurance status. The Ryan White HIV/AIDS Program provides services to eligible individuals who are uninsured or underinsured. Our case managers can help you apply for insurance programs like Medicaid or access services through the Ryan White Program.',

  'What is the HIV Health Services Planning Council?':
    'The HIV Health Services Planning Council is a federally-mandated body that plans, prioritizes, and allocates Ryan White Program funds for HIV services in Middlesex, Somerset, and Hunterdon counties. The Council includes people living with HIV, healthcare providers, community representatives, and local officials who work together to ensure effective HIV care and services.',

  'How can I join the Planning Council?':
    'The Planning Council welcomes new members, especially people living with HIV/AIDS. Membership applications are reviewed periodically, and members serve two-year terms. Visit our Planning Council page to learn about membership requirements and download an application, or call (732) 937-5288 for more information.',
};

// Helper function to create Lexical editor format
function createRichTextContent(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              version: 1,
              text: text,
              format: 0,
              style: '',
              mode: 'normal',
              detail: 0,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  };
}

async function login() {
  console.log('🔐 Logging in...');
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
}

async function createFAQ(token: string, faqData: Omit<FAQ, 'answer'>, answerText: string) {
  const faq: FAQ = {
    ...faqData,
    answer: createRichTextContent(answerText),
  };

  console.log(`📝 Creating FAQ: "${faq.question}"`);

  const response = await fetch(`${API_URL}/api/faqs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(faq),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create FAQ: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const created = await response.json();
  console.log(`✅ Created FAQ with ID: ${created.doc.id}`);
  return created.doc;
}

async function main() {
  console.log('🚀 Starting FAQ seeding...\n');
  console.log(`API URL: ${API_URL}`);
  console.log(`Total FAQs to create: ${sampleFAQs.length}\n`);

  try {
    // Login
    const token = await login();
    console.log('✅ Login successful\n');

    // Create FAQs
    let successCount = 0;
    let errorCount = 0;

    for (const faqData of sampleFAQs) {
      try {
        const answerText = answers[faqData.question];
        if (!answerText) {
          console.log(`⚠️  No answer found for: "${faqData.question}" - skipping`);
          continue;
        }

        await createFAQ(token, faqData, answerText);
        successCount++;

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error creating FAQ "${faqData.question}":`, error);
        errorCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successfully created: ${successCount} FAQs`);
    if (errorCount > 0) {
      console.log(`❌ Failed: ${errorCount} FAQs`);
    }
    console.log('\n🎉 FAQ seeding complete!');

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
