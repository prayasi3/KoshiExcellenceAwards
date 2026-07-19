import { z } from "zod";

const emptyToUndefined = (value) => (value === "" ? undefined : value);

const optionalString = (max = 255) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(max).optional().nullable()
  );

const requiredString = (field, max = 255) =>
  z
    .string({
      error: `${field} is required`,
    })
    .trim()
    .min(1, `${field} is required`)
    .max(max);

const optionalPositiveInt = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().positive().optional().nullable()
);

const requiredPositiveInt = (field) =>
  z.coerce
    .number({
      error: `${field} is required`,
    })
    .int()
    .positive(`${field} must be a positive integer`);

export const idParamSchema = z.object({
  id: requiredPositiveInt("ID"),
});

const optionalDate = z.preprocess(
  emptyToUndefined,
  z.coerce.date().optional().nullable()
);

const optionalDateOnly = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format")
    .optional()
    .nullable()
);

const createUpdateSchema = (schema) => schema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field is required"
);

export const authSchemas = {
  register: z.object({
    full_name: requiredString("Full name"),
    email: requiredString("Email").email("Email must be valid"),
    password: requiredString("Password", 128).min(
      8,
      "Password must be at least 8 characters"
    ),
  }),

  login: z.object({
    email: requiredString("Email").email("Email must be valid"),
    password: requiredString("Password", 128),
  }),

  refresh: z
    .object({
      refreshToken: optionalString(2000),
      refresh_token: optionalString(2000),
    })
    .refine((data) => data.refreshToken || data.refresh_token, {
      message: "Refresh token is required",
    }),
};

const userBaseSchema = z.object({
  full_name: requiredString("Full name"),
  email: requiredString("Email").email("Email must be valid"),
  password: requiredString("Password", 128).min(
    8,
    "Password must be at least 8 characters"
  ),
  role: z.enum(["admin"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  last_login: optionalDate,
});

export const userSchemas = {
  create: userBaseSchema,
  update: createUpdateSchema(
    userBaseSchema.extend({
      password: requiredString("Password", 128)
        .min(8, "Password must be at least 8 characters")
        .optional(),
      full_name: requiredString("Full name").optional(),
      email: requiredString("Email").email("Email must be valid").optional(),
    })
  ),
};

const categoryBaseSchema = z.object({
  category_name: requiredString("Category name"),
  description: optionalString(5000),
  is_active: z.boolean().optional(),
});

export const categorySchemas = {
  create: categoryBaseSchema,
  update: createUpdateSchema(
    categoryBaseSchema.extend({
      category_name: requiredString("Category name").optional(),
    })
  ),
};

const editionBaseSchema = z.object({
  title: optionalString(),
  year: requiredPositiveInt("Year"),
  venue: optionalString(),
  event_date: optionalDateOnly,
  status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
  category_ids: z.array(z.coerce.number().int().positive()).optional(),
});

export const editionSchemas = {
  create: editionBaseSchema,
  update: createUpdateSchema(
    editionBaseSchema.extend({
      year: requiredPositiveInt("Year").optional(),
    })
  ),
};

const galleryBaseSchema = z.object({
  edition_id: optionalPositiveInt,
  media_type: z.enum(["image", "video"]).optional().nullable(),
  media_url: optionalString(500),
  caption: optionalString(5000),
});

export const gallerySchemas = {
  create: galleryBaseSchema,
  update: createUpdateSchema(galleryBaseSchema),
};

const honoreeBaseSchema = z.object({
  edition_id: optionalPositiveInt,
  name: requiredString("Name"),
  title: optionalString(),
  description: optionalString(5000),
  image_url: optionalString(500),
});

export const honoreeSchemas = {
  create: honoreeBaseSchema,
  update: createUpdateSchema(
    honoreeBaseSchema.extend({
      name: requiredString("Name").optional(),
    })
  ),
};

const recipientBaseSchema = z.object({
  edition_id: requiredPositiveInt("Edition ID"),
  category_id: requiredPositiveInt("Category ID"),
  full_name: requiredString("Full name"),
  title: optionalString(),
  slug: optionalString(),
  bio: optionalString(5000),
  photo_url: optionalString(500),
});

export const recipientSchemas = {
  create: recipientBaseSchema,
  update: createUpdateSchema(
    recipientBaseSchema.extend({
      edition_id: requiredPositiveInt("Edition ID").optional(),
      category_id: requiredPositiveInt("Category ID").optional(),
      full_name: requiredString("Full name").optional(),
    })
  ),
};

const speakerBaseSchema = z.object({
  edition_id: requiredPositiveInt("Edition ID"),
  name: requiredString("Name"),
  designation: optionalString(),
  organization: optionalString(),
  bio: optionalString(5000),
  image_url: optionalString(500),
  linkedin_url: optionalString(255),
  display_order: z.coerce.number().int().min(0).optional(),
});

export const speakerSchemas = {
  create: speakerBaseSchema,
  update: createUpdateSchema(
    speakerBaseSchema.extend({
      edition_id: requiredPositiveInt("Edition ID").optional(),
      name: requiredString("Name").optional(),
    })
  ),
};

const sponsorBaseSchema = z.object({
  edition_id: optionalPositiveInt,
  sponsor_name: optionalString(),
  logo_url: optionalString(500),
  website: optionalString(),
  sponsor_level: z
    .enum(["title", "platinum", "gold", "silver", "partner"])
    .optional()
    .nullable(),
  display_order: z.coerce.number().int().min(0).optional(),
});

export const sponsorSchemas = {
  create: sponsorBaseSchema,
  update: createUpdateSchema(sponsorBaseSchema),
};

const teamBaseSchema = z.object({
  full_name: requiredString("Full name"),
  role: z.enum([
    "chief_advisor",
    "chief_judge",
    "chairman",
    "executive_director",
    "director",
    "member",
  ]),
  designation: optionalString(),
  photo_url: optionalString(500),
  bio: optionalString(5000),
  display_order: z.coerce.number().int().min(0).optional(),
  role_priority: requiredPositiveInt("Role priority"),
  is_active: z.boolean().optional(),
});

export const teamSchemas = {
  create: teamBaseSchema,
  update: createUpdateSchema(
    teamBaseSchema.extend({
      full_name: requiredString("Full name").optional(),
      role: z
        .enum([
          "chief_advisor",
          "chief_judge",
          "chairman",
          "executive_director",
          "director",
          "member",
        ])
        .optional(),
      role_priority: requiredPositiveInt("Role priority").optional(),
    })
  ),
};
