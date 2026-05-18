const axios = require('axios');

/**
 * AI Service — Calls OpenRouter API for HR recommendations
 * Uses prompt engineering for professional employee analysis
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Build professional HR prompt from employee data
const buildPrompt = (employees, type = 'full') => {
  const employeeList = Array.isArray(employees) ? employees : [employees];

  const employeeInfo = employeeList
    .map(
      (emp, i) =>
        `${i + 1}. Name: ${emp.name} | Department: ${emp.department} | Skills: ${emp.skills.join(', ')} | Performance Score: ${emp.performanceScore}/100 | Experience: ${emp.experience} years`
    )
    .join('\n');

  const prompts = {
    full: `You are an expert HR analytics advisor. Analyze the following employee data and provide a comprehensive professional assessment.

Employee Data:
${employeeInfo}

Please provide the following in a well-structured format:

1. **Promotion Recommendations**: Which employees deserve promotion and why? (Score >= 80)
2. **Training Suggestions**: What training programs would benefit employees scoring below 60?
3. **Skill Gap Analysis**: What skills are missing or need improvement for each employee?
4. **Employee Ranking**: Rank all employees from best to least performing with justification.
5. **AI Feedback**: Provide personalized constructive feedback for each employee.

Use professional HR language and be specific with actionable recommendations.`,

    promotion: `As an HR advisor, analyze these employees for promotion readiness:
${employeeInfo}
Provide promotion recommendations with justification for each employee.`,

    training: `As a training coordinator, suggest training programs for these employees:
${employeeInfo}
Focus on skill gaps and areas of improvement.`,

    ranking: `Rank the following employees based on overall performance and potential:
${employeeInfo}
Provide a justified ranking with brief explanation for each position.`,
  };

  return prompts[type] || prompts.full;
};

// Call OpenRouter API
const getAIRecommendation = async (employees, type = 'full') => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    // Fallback: generate rule-based recommendations if no API key
    return generateFallbackRecommendation(employees);
  }

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional HR analytics AI assistant specialized in employee performance evaluation and recommendations.',
          },
          {
            role: 'user',
            content: buildPrompt(employees, type),
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Employee Performance Analytics',
        },
      }
    );

    return {
      success: true,
      recommendation: response.data.choices[0].message.content,
      model: response.data.model,
      source: 'ai',
    };
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    // Fallback to rule-based on API failure
    return generateFallbackRecommendation(employees);
  }
};

// Rule-based fallback recommendations when API is unavailable
const generateFallbackRecommendation = (employees) => {
  const employeeList = Array.isArray(employees) ? employees : [employees];

  let recommendation = '## 📊 AI-Generated Employee Performance Analysis\n\n';

  // Sort by performance score descending
  const sorted = [...employeeList].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  // 1. Promotion Recommendations
  recommendation += '### 🏆 Promotion Recommendations\n\n';
  const highPerformers = sorted.filter((e) => e.performanceScore >= 80);
  if (highPerformers.length > 0) {
    highPerformers.forEach((emp) => {
      recommendation += `- **${emp.name}** (Score: ${emp.performanceScore}/100) — Recommended for promotion. `;
      recommendation += `Strong performer in ${emp.department} with ${emp.experience} years of experience. `;
      recommendation += `Key skills: ${emp.skills.join(', ')}.\n`;
    });
  } else {
    recommendation +=
      '- No employees currently meet the promotion threshold (score ≥ 80).\n';
  }

  // 2. Training Suggestions
  recommendation += '\n### 📚 Training Suggestions\n\n';
  const lowPerformers = sorted.filter((e) => e.performanceScore < 60);
  if (lowPerformers.length > 0) {
    lowPerformers.forEach((emp) => {
      recommendation += `- **${emp.name}** (Score: ${emp.performanceScore}/100) — `;
      recommendation += `Recommended training in: `;
      if (emp.department === 'Development') {
        recommendation += 'Advanced programming, code review practices, system design.\n';
      } else if (emp.department === 'Design') {
        recommendation += 'UI/UX best practices, design tools mastery, user research.\n';
      } else if (emp.department === 'Marketing') {
        recommendation += 'Digital marketing analytics, SEO/SEM strategies, content marketing.\n';
      } else {
        recommendation += 'Leadership skills, communication, domain-specific advanced training.\n';
      }
    });
  } else {
    recommendation += '- All employees are performing above the training threshold.\n';
  }

  // 3. Skill Gap Analysis
  recommendation += '\n### 🔍 Skill Gap Analysis\n\n';
  sorted.forEach((emp) => {
    recommendation += `- **${emp.name}** (${emp.department}): `;
    const deptSkillMap = {
      Development: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'Git'],
      Design: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'CSS'],
      Marketing: ['SEO', 'Analytics', 'Content Strategy', 'Social Media', 'PPC'],
      HR: ['Recruitment', 'HRIS', 'Compliance', 'Training', 'Employee Relations'],
      Finance: ['Financial Modeling', 'Excel', 'SAP', 'Accounting', 'Budgeting'],
      Sales: ['CRM', 'Negotiation', 'Lead Generation', 'Pipeline Management'],
      Operations: ['Process Optimization', 'Supply Chain', 'Lean Six Sigma'],
      Management: ['Leadership', 'Strategic Planning', 'Team Building', 'KPI Tracking'],
    };
    const recommended = deptSkillMap[emp.department] || ['Communication', 'Leadership'];
    const missing = recommended.filter(
      (s) => !emp.skills.some((es) => es.toLowerCase().includes(s.toLowerCase()))
    );
    if (missing.length > 0) {
      recommendation += `Consider developing: ${missing.slice(0, 3).join(', ')}.\n`;
    } else {
      recommendation += 'Well-rounded skill set for their department.\n';
    }
  });

  // 4. Employee Ranking
  recommendation += '\n### 📈 Employee Ranking\n\n';
  sorted.forEach((emp, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
    recommendation += `${medal} **${emp.name}** — Score: ${emp.performanceScore}/100 | ${emp.department} | ${emp.experience} yrs exp\n`;
  });

  // 5. Feedback
  recommendation += '\n### 💬 Personalized Feedback\n\n';
  sorted.forEach((emp) => {
    recommendation += `**${emp.name}**: `;
    if (emp.performanceScore >= 90) {
      recommendation += 'Outstanding performer! Continue leading by example and consider mentoring junior team members.\n';
    } else if (emp.performanceScore >= 80) {
      recommendation += 'Excellent work! Focus on innovation and cross-functional collaboration to reach the next level.\n';
    } else if (emp.performanceScore >= 60) {
      recommendation += 'Good performer with room for growth. Set specific improvement goals and seek feedback regularly.\n';
    } else if (emp.performanceScore >= 40) {
      recommendation += 'Needs improvement. Enroll in recommended training programs and work closely with a mentor.\n';
    } else {
      recommendation += 'Requires immediate attention. Schedule a performance improvement plan meeting with management.\n';
    }
  });

  return {
    success: true,
    recommendation,
    model: 'rule-based-engine',
    source: 'fallback',
  };
};

module.exports = { getAIRecommendation };
