/*1. Users Collection
This collection will handle Admins, Trainers, and Customers using a role field.


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'customer'], required: true },
  profileDetails: {
    age: Number,
    gender: String,
    healthGoals: String, // For customers
    specializations: [String], // For trainers
    certifications: [String], // For trainers
  },
  notifications: [{ type: String }], // Notifications
  feedback: [{ 
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    rating: Number
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


2. Subscription Plans Collection
This collection defines the membership plans.

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, enum: ['monthly', 'quarterly', 'yearly'], required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);


3. Payments Collection
For payment tracking and refunds.

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], required: true },
  type: { type: String, enum: ['payment', 'refund'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);


4. Sessions Collection


const SessionSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['requested', 'approved', 'rejected', 'completed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);


5. Workout and Diet Plans Collection
Custom plans created and assigned by trainers.

const PlanSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['workout', 'diet'], required: true },
  details: String,
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);


6. Feedback Collection
Centralized feedback for trainers and sessions.

const FeedbackSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  message: String,
  rating: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);*/