const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const OpenAI = require('openai');
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');

// All routes in this file are protected
router.use(protect);

// ---------------------------------------------------------------------------
// Mock AI response generator (used when OpenAI API key is missing or fails)
// ---------------------------------------------------------------------------
function generateMockResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  // Coding / programming
  if (
    msg.match(
      /\b(code|programming|javascript|python|java|typescript|react|node|css|html|sql|git|api|function|variable|loop|array|object|class|debug|error|bug|compile|runtime|algorithm|data structure|regex|docker|kubernetes|aws|deploy)\b/
    )
  ) {
    const codingResponses = [
      "That's a great programming question! Here's what I'd recommend: break the problem into smaller pieces, write tests first, then implement each piece incrementally. Make sure to handle edge cases and add proper error handling. If you're working with asynchronous code, consider using async/await for cleaner syntax.",
      "When tackling this kind of coding challenge, start by understanding the input and expected output clearly. Sketch out your algorithm on paper before writing code. Use meaningful variable names, keep functions small and focused, and don't forget to comment complex logic. Version control with git is your best friend.",
      "From a software engineering perspective, I'd suggest following the SOLID principles here. Keep your code modular, write unit tests, and use dependency injection where appropriate. Consider the time and space complexity of your solution. Also look into design patterns that might apply — Strategy, Observer, or Factory patterns are commonly useful.",
      "For this development task, I recommend setting up a proper project structure first. Use a linter (like ESLint) and a formatter (like Prettier) to keep code consistent. Implement CI/CD early in the project. Write documentation as you go rather than leaving it to the end. Use environment variables for configuration.",
      "Debugging tip: use console.log strategically or better yet, use a proper debugger. Set breakpoints, inspect the call stack, and watch variable values. Check your assumptions about data types and values. Read error messages carefully — they usually tell you exactly what went wrong and where.",
    ];
    return codingResponses[Math.floor(Math.random() * codingResponses.length)];
  }

  // AI / machine learning
  if (
    msg.match(
      /\b(ai|artificial intelligence|machine learning|deep learning|neural|gpt|llm|model|training|dataset|nlp|computer vision|transformer|chatbot)\b/
    )
  ) {
    const aiResponses = [
      "AI and machine learning are fascinating fields! Modern LLMs (Large Language Models) like GPT are based on the Transformer architecture, which uses self-attention mechanisms to process sequential data. They're trained on vast amounts of text data and learn to predict the next token in a sequence, which gives them remarkable language understanding capabilities.",
      "When working with AI models, it's important to understand the distinction between training and inference. Training requires significant compute resources and labeled data, while inference is the process of using a trained model to make predictions. Fine-tuning allows you to adapt a pre-trained model to your specific use case with less data.",
      "The key to good AI results is quality data. Garbage in, garbage out applies strongly here. Focus on data cleaning, proper preprocessing, and ensuring your training set is representative of real-world scenarios. Also consider ethical implications — check for bias in your data and model outputs.",
      "Natural Language Processing has evolved dramatically with transformers. Techniques like attention mechanisms, tokenization strategies (BPE, WordPiece), and transfer learning have revolutionized how we build language applications. RAG (Retrieval-Augmented Generation) is a powerful pattern for grounding LLM outputs in factual data.",
    ];
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
  }

  // Math / science
  if (
    msg.match(
      /\b(math|calculus|algebra|geometry|physics|chemistry|biology|science|equation|formula|theorem|proof|statistics|probability)\b/
    )
  ) {
    const scienceResponses = [
      "Great question! In mathematics, it often helps to start with the fundamentals and build up. Make sure you understand the underlying definitions and axioms. Work through simple examples first, then generalize. Visualization can be incredibly powerful — try graphing functions or drawing diagrams to build intuition.",
      "The scientific method is your best approach here: observe, hypothesize, test, and analyze. Whether you're dealing with physics, chemistry, or biology, controlled experiments and careful measurement are key. Always consider sources of error and try to quantify uncertainty in your results.",
      "For this kind of mathematical problem, I'd suggest looking at it from multiple angles. Try algebraic manipulation, geometric interpretation, and numerical experimentation. Sometimes a change of variables or a clever substitution can simplify things dramatically. Don't forget to check your answer by substituting it back into the original problem.",
    ];
    return scienceResponses[Math.floor(Math.random() * scienceResponses.length)];
  }

  // Business / productivity
  if (
    msg.match(
      /\b(business|startup|marketing|sales|productivity|management|leadership|strategy|revenue|growth|customer|product|market|team|project|agile|scrum)\b/
    )
  ) {
    const businessResponses = [
      "From a business strategy perspective, focus on understanding your customer deeply. Use frameworks like Jobs-to-Be-Done to identify what problems you're really solving. Build an MVP, get it in front of users quickly, and iterate based on real feedback rather than assumptions.",
      "For productivity, I recommend the Eisenhower Matrix: categorize tasks by urgency and importance. Focus on important-but-not-urgent work to prevent fires. Use time-blocking, limit work-in-progress, and protect deep work time. Regular retrospectives help teams continuously improve their processes.",
      "Strong leadership starts with clear communication and psychological safety. Set a compelling vision, break it into achievable milestones, and empower your team to figure out the how. Measure outcomes, not hours worked. Invest in your team's growth — their success is your success.",
    ];
    return businessResponses[Math.floor(Math.random() * businessResponses.length)];
  }

  // Writing / creative
  if (
    msg.match(
      /\b(write|writing|essay|story|poem|creative|novel|blog|article|content|grammar|edit|proofread|summarize|outline)\b/
    )
  ) {
    const writingResponses = [
      "For effective writing, start with a clear outline. Know your audience and purpose before you begin. Use the 'inverted pyramid' structure for non-fiction — lead with the most important information. Keep sentences concise, vary their length for rhythm, and read your work aloud to catch awkward phrasing.",
      "Great writing is rewriting. Get your ideas down in a rough first draft without worrying about perfection. Then revise for clarity, structure, and flow. Cut ruthlessly — if a sentence doesn't add value, remove it. Use active voice, specific details, and concrete examples to bring your writing to life.",
      "When crafting content, think about what makes it valuable to the reader. Answer their questions, solve their problems, or tell a compelling story. Use headers and formatting to improve scannability. End with a clear takeaway or call to action. And always proofread — typos erode credibility.",
    ];
    return writingResponses[Math.floor(Math.random() * writingResponses.length)];
  }

  // Health / fitness
  if (
    msg.match(
      /\b(health|fitness|exercise|workout|diet|nutrition|sleep|mental health|stress|meditation|yoga|weight|muscle|cardio|wellness)\b/
    )
  ) {
    const healthResponses = [
      "For overall wellness, focus on the three pillars: quality sleep (7-9 hours), regular physical activity (150+ minutes moderate exercise per week), and balanced nutrition. Consistency matters more than intensity. Start small, build habits gradually, and track your progress.",
      "Mental health is just as important as physical health. Practice stress management through techniques like deep breathing, meditation, or journaling. Stay socially connected, set boundaries, and don't hesitate to seek professional help when needed. Regular exercise is one of the most effective mood boosters available.",
      "A balanced approach to nutrition means focusing on whole foods — vegetables, fruits, lean proteins, whole grains, and healthy fats. Stay hydrated, be mindful of portion sizes, and don't demonize any food group. Sustainable healthy eating is about long-term patterns, not short-term restrictions.",
    ];
    return healthResponses[Math.floor(Math.random() * healthResponses.length)];
  }

  // Greeting
  if (msg.match(/\b(hello|hi|hey|greetings|good morning|good afternoon|good evening|howdy|what's up|sup)\b/)) {
    const greetings = [
      "Hello! I'm ChatNova, your AI assistant. I can help with coding, science, writing, business advice, and much more. What would you like to explore today?",
      "Hi there! Welcome to ChatNova. I'm here to help with any questions you have — whether it's about programming, AI, science, productivity, or anything else. What's on your mind?",
      "Hey! Great to chat with you. I'm ready to assist with technical questions, creative projects, learning new topics, or just having an interesting conversation. How can I help?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Help / what can you do
  if (msg.match(/\b(help|what can you|what do you|capabilities|features|assist)\b/)) {
    return "I'm ChatNova, a versatile AI assistant. I can help you with:\n\n- **Programming & Development**: Code review, debugging, architecture advice, learning new languages\n- **AI & Machine Learning**: Concepts, implementation guidance, best practices\n- **Writing & Content**: Drafting, editing, brainstorming, outlining\n- **Math & Science**: Problem solving, explanations, research guidance\n- **Business & Productivity**: Strategy, project management, workflow optimization\n- **General Knowledge**: History, geography, culture, current topics\n\nJust ask me anything and I'll do my best to provide a helpful, detailed response!";
  }

  // General fallback — varied and useful
  const generalResponses = [
    "That's an interesting question! Let me share my thoughts. The key is to approach this systematically: define the problem clearly, gather relevant information, consider multiple perspectives, and then form a well-reasoned conclusion. Would you like me to dive deeper into any specific aspect?",
    "Great topic! There are several angles to consider here. First, let's look at the fundamentals and work our way up to the more nuanced aspects. Context matters a lot in situations like this, so understanding the specific circumstances will help me give you a more tailored answer. Could you tell me more about your specific situation?",
    "I'd be happy to help with that! Let me break this down into manageable parts. Understanding the 'why' behind things often leads to better solutions than just knowing the 'what'. Let's start with the core concept and build from there. What specific aspect would you like to focus on first?",
    "That's a thoughtful question. Based on what I know, there are multiple valid approaches here. The best choice depends on your specific goals, constraints, and timeline. I'd recommend starting with the simplest viable approach and iterating from there. Shall I outline a few different options for you to consider?",
    "Interesting! Let me think through this carefully. Every problem has layers, and sometimes the most obvious solution isn't the best one. Let's examine the assumptions, consider alternatives, and weigh the trade-offs. I'll give you my best analysis and you can decide what resonates with your situation.",
  ];
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// ---------------------------------------------------------------------------
// Get AI response — tries OpenAI first, falls back to mock
// ---------------------------------------------------------------------------
async function getAIResponse(messages) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey && apiKey !== 'your_openai_api_key_here' && apiKey.startsWith('sk-')) {
    try {
      const openai = new OpenAI({ apiKey });

      const formattedMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Prepend a system message
      formattedMessages.unshift({
        role: 'system',
        content:
          'You are ChatNova, a helpful and knowledgeable AI assistant. Provide clear, accurate, and well-structured responses. Be friendly but professional.',
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
        max_tokens: 1024,
        temperature: 0.7,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.warn('OpenAI API call failed, falling back to mock response:', error.message);
      const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
      return generateMockResponse(lastUserMsg ? lastUserMsg.content : '');
    }
  }

  // No valid API key — use mock
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  return generateMockResponse(lastUserMsg ? lastUserMsg.content : '');
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// @route   GET /api/chats
// @desc    Get all chats for the authenticated user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .select('title messages createdAt updatedAt')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: chats.length,
      data: chats,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/chats
// @desc    Create a new chat
// @access  Private
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Chat title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const chat = await Chat.create({
        user: req.user._id,
        title: req.body.title,
        messages: [],
      });

      res.status(201).json({
        success: true,
        data: chat,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/chats/:id
// @desc    Get a single chat by ID
// @access  Private
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid chat ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const chat = await Chat.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: 'Chat not found',
        });
      }

      res.json({
        success: true,
        data: chat,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   POST /api/chats/:id/message
// @desc    Add a user message and get an AI response
// @access  Private
router.post(
  '/:id/message',
  [
    param('id').isMongoId().withMessage('Invalid chat ID'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Message content is required')
      .isLength({ max: 10000 })
      .withMessage('Message cannot exceed 10000 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const chat = await Chat.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: 'Chat not found',
        });
      }

      // Add user message
      const userMessage = {
        role: 'user',
        content: req.body.content,
        timestamp: new Date(),
      };
      chat.messages.push(userMessage);

      // Update title to first user message if it's still the default
      if (chat.title === 'New Chat' && chat.messages.length === 1) {
        chat.title = req.body.content.slice(0, 60);
      }

      // Get AI response
      const aiContent = await getAIResponse(chat.messages);

      const assistantMessage = {
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
      };
      chat.messages.push(assistantMessage);

      await chat.save();

      // Return the full updated chat so the frontend can replace its state
      res.json({
        success: true,
        data: chat,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/chats/:id
// @desc    Delete a chat
// @access  Private
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid chat ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const chat = await Chat.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: 'Chat not found',
        });
      }

      res.json({
        success: true,
        message: 'Chat deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
