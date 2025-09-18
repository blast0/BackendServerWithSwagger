const Employee = require('../models/employee');
const Department = require('../models/department');

exports.createEmployee = async (req, res, next) => {
  try {
    const { department } = req.body;
    const dept = await Department.findById(department);
    if (!dept) return res.status(400).json({ error: 'Invalid department ID' });

    const emp = new Employee(req.body);
    await emp.save();
    await emp.populate('department');
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, department, q } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (q) filter.$or = [
      { firstName: new RegExp(q, 'i') },
      { lastName: new RegExp(q, 'i') },
      { position: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') }
    ];

    const skip = (Math.max(page,1)-1) * limit;
    const docs = await Employee.find(filter).populate('department').skip(skip).limit(parseInt(limit));
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    if (req.body.department) {
      const dept = await Department.findById(req.body.department);
      if (!dept) return res.status(400).json({ error: 'Invalid department ID' });
    }
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('department');
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
};
