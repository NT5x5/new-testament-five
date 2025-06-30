
async function loadPlan() {
  try {
    const res = await fetch('plan.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    const tbody = document.querySelector('#plan-table tbody');
    if (tbody) {
      data.weeks.forEach(item => {
        const tr = document.createElement('tr');

        // Render fixed 5 checkboxes for Mon–Fri
        let checkboxes = '';
        for (let i = 0; i < 5; i++) {
          checkboxes += `
            <td>
              <input type="checkbox" onchange="updateDay(${item.week}, ${i}, this.checked)">
            </td>
          `;
        }

        tr.innerHTML = `
          <td>${item.week}</td>
          <td>${item.chapters.join(', ')}</td>
          ${checkboxes}
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
    const checkboxes = tr.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((chk, i) => {
      chk.checked = (localStorage.getItem(`week${week}_day${i}`) === 'true');
    });
  });
}

loadPlan();
