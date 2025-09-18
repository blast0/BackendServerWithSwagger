const Department = require('../models/department');

exports.createDepartment = async (req, res, next) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (err) {
    next(err);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Math.max(page,1)-1) * limit;
    const docs = await Department.find().skip(skip).limit(parseInt(limit));
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json(dept);
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json(dept);
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};
