const noTimeConflict = (curr, existing) => {
  const currStartTime = new Date(curr.startTime);
  const currEndTime = new Date(curr.endTime);
  const existingStartTime = new Date(existing.startTime);
  const existingEndTime = new Date(existing.endTime);

  if (currStartTime > existingStartTime) {
    if (currStartTime < existingEndTime) return false;
    return true;
  }
  if (currStartTime < existingStartTime) {
    if (currEndTime > existingStartTime) return false;
    return true;
  }
  return false; //Start at the same time = conflict
};

exports.thereIsATimeSlotAvailable = (currentMovieDate, allMovieDates) => {
  if (!allMovieDates) return true;
  for (let i = 0; i < allMovieDates.length; i += 1) {
    if (!noTimeConflict(currentMovieDate, allMovieDates[i])) return false;
  }
  return true; //no conflict with any other movie time
};
