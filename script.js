
async function loadPlan() {
  try {
    const res = await fetch('plan.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    const tbody = document.querySelector('#plan-table tbody');
    tbody.innerHTML = ''; // Clear previous content

    data.weeks.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.week}</td>
        <td>${item.chapters.join(', ')}</td>
        <td><a href="${item.overviewUrl}" target="_blank" rel="noopener noreferrer">Overview Video</a></td>
        <td><input type="checkbox" onchange="updateDone(${item.week}, 0, this.checked)"></td>
        <td><input type="checkbox" onchange="updateDone(${item.week}, 1, this.checked)"></td>
        <td><input type="checkbox" onchange="updateDone(${item.week}, 2, this.checked)"></td>
        <td><input type="checkbox" onchange="updateDone(${item.week}, 3, this.checked)"></td>
        <td><input type="checkbox" onchange="updateDone(${item.week}, 4, this.checked)"></td>
      `;
      tbody.appendChild(tr);
    });

    loadDone();

  } catch (error) {
    console.error('Failed to load plan:', error);
  }
}

function updateDone(week, day, done) {
  localStorage.setItem(`week${week}day${day}`, done);
}

function loadDone() {
  document.querySelectorAll('#plan-table tbody tr').forEach(tr => {
    const week = tr.cells[0].textContent;
    const checkboxes = tr.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((chk, i) => {
      chk.checked = (localStorage.getItem(`week${week}day${i}`) === 'true');
    });
  });
}

loadPlan();
