import {body, validationResult} from 'express-validator'
  // Validate the 'name' field
  const createTaskValidation = [
    // Validate the 'name' field
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    
    // Exclude validation for the 'status' field
    body('status').optional(),
  ]
