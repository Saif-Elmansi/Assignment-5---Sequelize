import { User } from "../../DB/models/user.model.js";

// 1. Signup using build & save
export const signupService = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const user = User.build({ name, email, password, role });
    await user.save();

    return res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// 2. Create or Update based on PK with skip validation
export const upsertUserService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // upsert بيبحث بالـ PK (id)، ولو موجود بيعمل update، لو مش موجود بيعمل create
    await User.upsert(
      { id, name, email, password, role },
      { validate: false } // skip validation option
    );

    return res
      .status(200)
      .json({ message: "User created or updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 3. Find user by email
export const getUserByEmailService = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 4. Get user by PK excluding 'role'
export const getUserByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};