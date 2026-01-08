export const useRating = () => {

  const calcStarsValue = (starsData: {
    total?: number | undefined
    count?: number | undefined 
    stars?: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number }
  }) => {
    const { total, count } = starsData
    if (!count || !total) return 0
    return total / count
  }

  return {
    calcStarsValue
  }
}
