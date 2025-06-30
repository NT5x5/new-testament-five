
async function loadPlan() {
  try {
    const res = await fetch('plan.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    const tbody = document.querySelector('#plan-table tbody');
    if (tbody) {
      data.weeks.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.week}</td>
          <td>${item.dates[0]}–${item.dates[1]}</td>
          <td>${item.chapters.join(', ')}</td>
          ${item.chapters.map((_, i) => `
            <td>
              <input type="checkbox" onchange="updateDay(${item.week}, ${i}, this.checked)">
            </td>
          `).join('')}
        `;
        tbody.appendChild(tr);
      });
      loadDone();
    }

  } catch (error) {
    console.error('Failed to load plan:', error);
  }
}

function updateDay(week, dayIndex, done) {
  localStorage.setItem(`week${week}_day${dayIndex}`, done);
}

function loadDone() {
  document.querySelectorAll('#plan-table tbody tr').forEach(tr => {
    const week = tr.cells[0].textContent;
    for (let i = 0; i < 5; i++) {
      const chk = tr.querySelectorAll('input[type=checkbox]')[i];
      chk.checked = (localStorage.getItem(`week${week}_day${i}`) === 'true');
    }
  });
}

loadPlan();
}

loadPlan();
