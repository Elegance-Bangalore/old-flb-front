export const farmhouse = "farmhouse";
export const farmland = "farmland";
export const Estates = "Estates";
export const agricultureLand = "agricultureLand";
export const sell = "sell";
export const buy = "buy";
export const admin = "admin";
export const subAdmin = "user";
export const trendingVideos = "Trending Videos";
export const knowledgeHub = "Knowledge Hub";
export const industaryUpdates = "Industry Updates & Reads";

export function formatDate(value) {
  if (value) {
    var date = new Date(value);
    var formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  return formattedDate;
}

export function formatNumber(value) {
  return Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

export function normalizeFilters(filters) {
  const normalizedFilters = { ...filters };
  for (let key in normalizedFilters) {
    if (
      normalizedFilters.hasOwnProperty(key) &&
      normalizedFilters[key] === undefined
    ) {
      normalizedFilters[key] = "";
    }
  }
  return normalizedFilters;
}

export function formatDateTime(value) {
  if (value) {
    var date = new Date(value);
    var formattedDateTime = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return formattedDateTime;
}

export function formatNumberInCr(value) {
  if (value >= 10000000) {
    const crValue = value / 10000000;
    return "₹" + crValue.toFixed(2) + "cr";
  } else if (value >= 100000) {
    const lakhsValue = value / 100000;
    return "₹" + lakhsValue.toFixed(2) + "L";
  } else {
    return Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }
}

export function formatNumberWithoutDecimal(value) {
  if (value >= 10000000) {
    const crValue = (value / 10000000).toFixed(2);
    return "₹" + crValue + "cr";
  } else if (value >= 100000) {
    const lakhsValue = (value / 100000).toFixed(2);
    return "₹" + lakhsValue + "L";
  } else {
    return Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}

export function formatPropertyLength(value) {
  if (value >= 10000000) {
    const crValue = value / 10000000;
    return crValue.toFixed(2) + "cr";
  } else if (value >= 100000) {
    const lakhsValue = value / 100000;
    return lakhsValue.toFixed(2) + "L";
  } else {
    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }
}

// export function capitalizeFirstLetter(string) {
//   return string?.charAt(0)?.toUpperCase() + string.slice(1);
// }

export function capitalizeArray(array) {
  if (array?.length) {
    return array?.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  } else {
    return [];
  }
}

export const calculateRelativeTime = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const diff = now - createdAtDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (diff < 60000) {
    return "Just now";
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};

export const formatPropertyType = (propertyType) => {
  switch (propertyType) {
    case "farmHouse":
      return "Farmhouse";
    case "farmLand":
      return "Farmland";
    case "Estates":
      return "Estates";
    case "agricultureLand":
      return "Agriculture Land";
    case "farmhouse":
      return "Farmhouse";
    case "farmland":
      return "Farmland";
    default:
      return propertyType;
  }
};

export const formatTitleForUrl = (title = "") => {
  return title?.toLowerCase().replace(/\s+/g, "-");
};

export const generateDeveloperSlug = (companyName = "") => {
  if (!companyName) return "";
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
};

export const navigateToDetail = (
  propertyType = "",
  propertyTitle = "",
  propertyCode = ""
) => {
  return `/${formatTitleForUrl(
    formatPropertyType(propertyType)
  )}/${formatTitleForUrl(propertyTitle)}/${propertyCode}`;
};

// src/utils/timeUtils.js

export function convertTo12HourFormat(time24) {
  if (time24) {
    const [hour, minute, second] = time24.split(":");
    let hour12 = parseInt(hour, 10);
    const isPM = hour12 >= 12;
    hour12 = hour12 % 12 || 12; // Convert '0' to '12' for midnight and '12' to '12' for noon
    const period = isPM ? "PM" : "AM";
    return `${hour12}:${minute} ${period}`;
  }
}

export function getTime(time) {
  if (!time) {
    return;
  }
  const hour = String(time["$H"]).padStart(2, "0");
  const minute = String(time["$m"]).padStart(2, "0");
  const second = String(time["$s"]).padStart(2, "0");
  const timeString = `${hour}:${minute}:${second}`;
  return timeString;
}

export const capitalizeFirstLetter = (str) => {
  if (!str) return ''; // Handle empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1);
};


 export const handleFacebookShare = (event , metaUrl , blogTitle) => {
  event.preventDefault();
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    metaUrl
  )}&quote=${encodeURIComponent(blogTitle)}`;
  window.open(shareUrl, "_blank");
};

export const handleWhatsAppShare = async (event, metaUrl, blogTitle) => {
  event.preventDefault();
  let shortUrl = metaUrl;
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(metaUrl)}`);
    if (res.ok) {
      shortUrl = await res.text();
    }
  } catch (e) {
    // fallback to long url
  }
  const shareText = `${blogTitle}\n${shortUrl}`;
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(shareUrl, "_blank");
};

export const handleTwitterShare = (event , metaUrl , blogTitle) => {
  event.preventDefault();
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    metaUrl
  )}&text=${encodeURIComponent(blogTitle)}&via=FarmlandBazaar`;
  window.open(shareUrl, "_blank");
};