


const flattenDashboardData = (data) => {
    const flattenData = data.content.map((arr) => {
      return arr.content
    });
    return flattenData
  }

const getFlattenObjectValue = (v) => v.map((o) => o.value)