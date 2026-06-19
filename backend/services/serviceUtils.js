import { AppError } from "../utils/AppError.js";
import { Edition } from "../models/Edition.js";

export const hasBlankValue = (value) => String(value ?? "").trim() === "";

export const pickFields = (body, fields) => {
  const payload = {};

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

export const requireValue = (value, message) => {
  if (hasBlankValue(value)) {
    throw new AppError(message, 400);
  }
};

export const requirePresent = (value, message) => {
  if (value === undefined || value === null || value === "") {
    throw new AppError(message, 400);
  }
};

export const requireFound = (record, message) => {
  if (!record) {
    throw new AppError(message, 404);
  }

  return record;
};

export const toPlain = (record) =>
  typeof record?.toJSON === "function" ? record.toJSON() : record;

const paginationQueryKeys = new Set(["page", "limit", "sort", "sortBy"]);

const parsePositiveInteger = (value, fieldName) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    throw new AppError(`${fieldName} must be a positive integer`, 400);
  }

  return parsed;
};

const normalizeSortDirection = (direction) => {
  if (direction === undefined) {
    return null;
  }

  const normalized = String(direction).trim().toUpperCase();

  if (!["ASC", "DESC"].includes(normalized)) {
    throw new AppError("Sort must be asc or desc", 400);
  }

  return normalized;
};

const normalizeFilterValue = (value) => {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return value;
};

export const getPaginationOptions = (query = {}) => {
  const page = query.page ? parsePositiveInteger(query.page, "Page") : 1;
  const requestedLimit = query.limit
    ? parsePositiveInteger(query.limit, "Limit")
    : 10;
  const limit = Math.min(requestedLimit, 100);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const getSortOrder = (query = {}, defaultOrder = [], sortableFields = []) => {
  if (!defaultOrder.length) {
    return [];
  }

  const sortBy = query.sortBy || defaultOrder[0][0];

  if (!sortableFields.includes(sortBy)) {
    throw new AppError(`Cannot sort by ${sortBy}`, 400);
  }

  const direction = normalizeSortDirection(query.sort) || defaultOrder[0][1];
  return [[sortBy, direction], ...defaultOrder.slice(1)];
};

export const getFilterWhere = (query = {}, allowedFilters = []) => {
  const where = {};

  allowedFilters.forEach((field) => {
    if (query[field] !== undefined && !hasBlankValue(query[field])) {
      where[field] = normalizeFilterValue(query[field]);
    }
  });

  return where;
};

export const rejectUnsupportedListQuery = (
  query = {},
  allowedFilters = [],
  allowedSpecialFilters = []
) => {
  const allowedQueryKeys = new Set([
    ...paginationQueryKeys,
    ...allowedFilters,
    ...allowedSpecialFilters,
  ]);
  const unsupportedKey = Object.keys(query).find((key) => !allowedQueryKeys.has(key));

  if (unsupportedKey) {
    throw new AppError(`Unsupported query parameter: ${unsupportedKey}`, 400);
  }
};

export const getEditionInclude = (query = {}) => {
  if (query.edition === undefined || hasBlankValue(query.edition)) {
    return [];
  }

  const year = Number.parseInt(query.edition, 10);

  if (Number.isNaN(year)) {
    throw new AppError("Edition must be a year", 400);
  }

  return [
    {
      model: Edition,
      where: { year },
      attributes: [],
    },
  ];
};

export const findPaginated = async (
  model,
  query = {},
  {
    attributes,
    allowedFilters = [],
    defaultOrder = [["id", "ASC"]],
    sortableFields = ["id"],
    include = [],
    allowedSpecialFilters = [],
  } = {}
) => {
  rejectUnsupportedListQuery(query, allowedFilters, allowedSpecialFilters);

  const { page, limit, offset } = getPaginationOptions(query);
  const { count, rows } = await model.findAndCountAll({
    attributes,
    where: getFilterWhere(query, allowedFilters),
    include,
    order: getSortOrder(query, defaultOrder, sortableFields),
    limit,
    offset,
    distinct: true,
  });

  const totalPages = Math.ceil(count / limit);

  return {
    items: rows,
    pagination: {
      total: count,
      page,
      limit,
      total_pages: totalPages,
      has_next_page: page < totalPages,
      has_previous_page: page > 1,
    },
  };
};
