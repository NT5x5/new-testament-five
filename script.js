
async function loadPlan() {
  try {
    const res = await fetch('plan.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    const tbody = document.querySelector('#plan-table tbody');
    tbody.innerHTML = ''; // Clear existing content

    data.weeks.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.week}</td>`;

      item.days.forEach((day, i) => {
        const videoIcon = day.video
          ? ` <a href="${day.video}" target="_blank" rel="noopener noreferrer">🎬</a>`
          : '';
        const checkboxId = `week${item.week}day${i}`;
        tr.innerHTML += `
          <td>
            <input type="checkbox" id="${checkboxId}" onchange="updateDone(${item.week}, ${i}, this.checked)">
            <label for="${checkboxId}">${day.chapter}${videoIcon}</label>
          </td>
        `;
      });

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
    for (let i = 1; i <= 5; i++) {
      const checkbox = tr.cells[i].querySelector('input[type=checkbox]');
      if (checkbox) {
        checkbox.checked = (localStorage.getItem(`week${week}day${i - 1}`) === 'true');
      }
    }
  });
}

loadPlan();
